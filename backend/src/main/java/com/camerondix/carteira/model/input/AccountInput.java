package com.camerondix.carteira.model.input;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;

@Data
@AllArgsConstructor
public class AccountInput {

    @NonNull
    private Integer id;

    @NonNull
    private String name;
}
