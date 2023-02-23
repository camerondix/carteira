package com.camerondix.carteira.utility;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Base64;
import java.util.List;

import org.springframework.stereotype.Component;

import graphql.relay.ConnectionCursor;
import graphql.relay.DefaultConnectionCursor;
import graphql.relay.Edge;

@Component
public class CursorUtility {

    public ConnectionCursor cursorFromIdAndTime(Integer id, LocalDateTime time) {

        var combined = id.toString() + "|" + time.toEpochSecond(ZoneOffset.UTC);
        return new DefaultConnectionCursor(
                Base64.getEncoder().encodeToString(combined.getBytes(StandardCharsets.UTF_8)));
    }

    public Integer idFromCursor(String cursor) {

        return Integer.parseInt(new String(Base64.getDecoder().decode(cursor)).split("\\|", 2)[0]);
    }

    public LocalDateTime timeFromCursor(String cursor) {

        return LocalDateTime.ofInstant(
                Instant.ofEpochSecond(
                        Long.parseLong(new String(Base64.getDecoder().decode(cursor)).split("\\|", 2)[1])),
                ZoneOffset.UTC.normalized());
    }

    public <T> ConnectionCursor getFirstCursorFrom(List<Edge<T>> edges) {

        return edges.isEmpty() ? null : edges.get(0).getCursor();
    }

    public <T> ConnectionCursor getLastCursorFrom(List<Edge<T>> edges) {

        return edges.isEmpty() ? null : edges.get(edges.size() - 1).getCursor();
    }

}
