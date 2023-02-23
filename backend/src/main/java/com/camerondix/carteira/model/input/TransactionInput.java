package com.camerondix.carteira.model.input;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;

@Data
@AllArgsConstructor
public class TransactionInput {

    @NonNull
    private Integer id;

    @NonNull
    private String name;

    private LocalDateTime timestamp;

    @NonNull
    private Integer categoryId;
}
