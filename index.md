---
layout: page
title: index
---
{% include JB/setup %}

<div class="posts">
  {% for post in site.posts %}
    <div class="posts-inner">
        <div class="posts-title">
            <span>{{ post.date | date_to_utc | date: "%Y-%m-%d" }}</span>
            <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a>
        </div>
        <div class="posts-intro">{{ post.description }}</div>
        <div class="posts-more"><a href="{{post.url}}" title="read more">read more...</a></div>
    </div>
  {% endfor %}
</div>