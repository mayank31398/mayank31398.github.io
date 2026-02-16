---
layout: page
permalink: /repositories/
title: Repositories
# description: Edit the `_data/repositories.yml` and change the `github_users` and `github_repos` lists to include your own GitHub profile and repositories.
nav: true
nav_order: 4
---

{% if site.data.repositories.github_users %}

## Organizations

<ul class="list-unstyled">
  {% for user in site.data.repositories.github_users %}
    <li class="mb-2"><a href="https://github.com/open-lm-engine/lm-engine">github.com/open-lm-engine</a></li>
    <li class="mb-2"><a href="https://github.com/{{ user }}">github.com/{{ user }}</a></li>
  {% endfor %}
</ul>

{% endif %}

{% if site.data.repositories.github_repos %}

## GitHub Repositories

<ul class="list-unstyled">
  {% for repo in site.data.repositories.github_repos %}
    <li class="mb-2"><a href="https://github.com/{{ repo }}">github.com/{{ repo }}</a></li>
  {% endfor %}
</ul>
{% endif %}
