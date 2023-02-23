package com.camerondix.carteira.model;

import java.util.List;

import com.camerondix.carteira.model.entity.Transaction;

import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;
import lombok.ToString;

@Builder
@Getter
@ToString
public class TransactionUpdate {

    @NonNull
    private String token;

    private String cursor;

    private boolean hasMore;

    @NonNull
    @Builder.Default
    private List<Transaction> added = List.of();

    @NonNull
    @Builder.Default
    private List<Transaction> modified = List.of();

    @NonNull
    @Builder.Default
    private List<String> removed = List.of();
}
