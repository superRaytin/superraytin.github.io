---
layout: page
title: 乱入记本 | special live
---
{% include JB/setup %}

<div class="posts">

{% for category in site.categories %}
  <div class="posts-item">
  <h2 id="{{ category[0] }}-ref">{{ category[0] | join: "/" }}</h2>
  {% for post in category[1] %}
      <div class="posts-inner">
          <div class="posts-title">
              <span>{{ post.date | date_to_utc | date: "%Y-%m-%d" }}</span>
              <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a>
          </div>
          <div class="posts-intro">{{ post.description }} <a href="{{post.url}}" title="read more" class="posts-more">more</a></div>
      </div>
  {% endfor %}
  </div>
{% endfor %}
</div>