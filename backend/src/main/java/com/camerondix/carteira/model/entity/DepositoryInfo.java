package com.camerondix.carteira.model.entity;

import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Getter
@ToString
public class DepositoryInfo {

    private String routingNumber;

    private String accountNumber;

    public boolean isEmpty() {

        return routingNumber == null &&
                accountNumber == null;
    }
}
