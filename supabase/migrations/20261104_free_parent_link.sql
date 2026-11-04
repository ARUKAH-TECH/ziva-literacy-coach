-- ZIVA Literacy becomes free with no registration (Nov 2026).
-- Adds a read-only "parent view" code so a parent who is far away can follow a
-- child's stars without anyone signing up. Nothing existing is dropped.

alter table public.lit_learners add column if not exists view_code text unique;
alter table public.lit_learners add column if not exists via_link boolean not null default false;
create index if not exists lit_learners_via_link_created on public.lit_learners (created_at) where via_link;

-- A child's phone makes its own learner (first name only, optional) and gets two codes:
--   code      ZV-XXXX-XXXX  kept on the child's phone, used to sync stars
--   view_code PV-XXXX-XXXX  sent to the parent, can only look
create or replace function public.lit_link_create(p_name text, p_level text, p_consent boolean)
returns jsonb language plpgsql volatile security definer set search_path = '' as $$
declare
  nm text := btrim(regexp_replace(coalesce(p_name, ''), '\s+', ' ', 'g'));
  gid uuid; v_code text; v_view text; jc text;
begin
  if coalesce(p_consent, false) is not true then raise exception 'Please tick the box to say a parent or guardian agrees.'; end if;
  if p_level not in ('kg', 'p1-3', 'p4-6', 'jhs') then raise exception 'Choose the class first.'; end if;
  if nm = '' then nm := 'Learner'; end if;
  nm := split_part(nm, ' ', 1);
  if char_length(nm) > 20 or nm ~ '[0-9@/:]' then raise exception 'Please use just a first name or nickname.'; end if;
  if (select count(*) from public.lit_learners where via_link and created_at > now() - interval '1 hour') >= 300 then
    raise exception 'Many people are doing this right now. Please try again in a few minutes.';
  end if;
  loop
    jc := public.lit_code(10);
    exit when not exists (select 1 from public.lit_groups where join_code = jc);
  end loop;
  insert into public.lit_groups (kind, name, join_code) values ('family', 'Family', jc) returning id into gid;
  loop
    v_code := 'ZV-' || public.lit_code(4) || '-' || public.lit_code(4);
    exit when not exists (select 1 from public.lit_learners where code = v_code);
  end loop;
  loop
    v_view := 'PV-' || public.lit_code(4) || '-' || public.lit_code(4);
    exit when not exists (select 1 from public.lit_learners where view_code = v_view);
  end loop;
  insert into public.lit_learners (group_id, name, level, code, view_code, via_link, consent_at)
  values (gid, nm, p_level, v_code, v_view, true, now());
  return jsonb_build_object('code', v_code, 'viewCode', v_view, 'name', nm, 'level', p_level, 'space', 'Family', 'kind', 'family');
end $$;

-- The parent view code for a learner this phone already has (makes one if missing).
create or replace function public.lit_view_code(p_code text)
returns text language plpgsql volatile security definer set search_path = '' as $$
declare l public.lit_learners; v_view text;
begin
  select * into l from public.lit_learners where code = upper(btrim(coalesce(p_code, ''))) for update;
  if l.id is null then raise exception 'That learner code was not found.'; end if;
  if l.view_code is not null then return l.view_code; end if;
  loop
    v_view := 'PV-' || public.lit_code(4) || '-' || public.lit_code(4);
    exit when not exists (select 1 from public.lit_learners where view_code = v_view);
  end loop;
  update public.lit_learners set view_code = v_view where id = l.id;
  return v_view;
end $$;

-- Read-only progress for a parent. Shows the first name, class and stars only.
create or replace function public.lit_parent_view(p_view text)
returns jsonb language plpgsql stable security definer set search_path = '' as $$
declare l public.lit_learners; d jsonb; u timestamptz;
begin
  select * into l from public.lit_learners where view_code = upper(btrim(coalesce(p_view, '')));
  if l.id is null then raise exception 'That parent code was not found. Check it with the child''s phone.'; end if;
  select data, updated_at into d, u from public.lit_progress where learner_id = l.id;
  return jsonb_build_object('name', l.name, 'level', l.level, 'data', coalesce(d, '{}'::jsonb), 'updatedAt', u);
end $$;

-- Comments without an account (still checked by ZIVARUKAH before they show).
create or replace function public.lit_comment_post_open(p_name text, p_kind text, p_body text)
returns jsonb language plpgsql volatile security definer set search_path = '' as $$
declare
  b text := btrim(regexp_replace(coalesce(p_body, ''), '\s+', ' ', 'g'));
  nm text := split_part(btrim(coalesce(p_name, '')), ' ', 1);
begin
  if p_kind not in ('comment', 'suggestion') then raise exception 'Choose comment or suggestion.'; end if;
  if char_length(b) < 3 then raise exception 'Please write a little more.'; end if;
  if char_length(b) > 600 then raise exception 'Please keep it under 600 letters.'; end if;
  if b ~ '(\d[\s-]?){9,}' or nm ~ '\d' then raise exception 'Please leave out phone numbers.'; end if;
  if b ~* '(https?://|www\.|\.com\y|\.gh\y|@[a-z0-9-]+\.)' then raise exception 'Please leave out links and email addresses.'; end if;
  if exists (select 1 from public.lit_comments where body = b and created_at > now() - interval '1 day') then
    raise exception 'Thank you, we already have this one.';
  end if;
  if (select count(*) from public.lit_comments where account_id is null and created_at > now() - interval '1 hour') >= 40 then
    raise exception 'Many comments are coming in. Please try again later.';
  end if;
  insert into public.lit_comments (author, kind, body) values (left(coalesce(nullif(nm, ''), 'Friend'), 20), p_kind, b);
  return jsonb_build_object('ok', true);
end $$;

revoke execute on function public.lit_link_create(text, text, boolean) from public;
revoke execute on function public.lit_view_code(text) from public;
revoke execute on function public.lit_parent_view(text) from public;
revoke execute on function public.lit_comment_post_open(text, text, text) from public;
grant execute on function public.lit_link_create(text, text, boolean) to anon, authenticated;
grant execute on function public.lit_view_code(text) to anon, authenticated;
grant execute on function public.lit_parent_view(text) to anon, authenticated;
grant execute on function public.lit_comment_post_open(text, text, text) to anon, authenticated;
