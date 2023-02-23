package com.camerondix.carteira.model.entity;

import lombok.NonNull;

public enum AprType {

    //@formatter:off
    BALANCE_TRANSFER_APR("balance_transfer_apr"),
    CASH_APR("cash_apr"),
    PURCHASE_APR("purchase_apr"),
    SPECIAL("special");
	//@formatr:on

    private String value;

    AprType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return String.valueOf(value);
    }

    public static AprType fromValue(@NonNull String value) {
        for (AprType b : AprType.values()) {
            if (b.value.equals(value)) {
                return b;
            }
        }
        throw new IllegalArgumentException("Unexpected value '" + value + "'");
    }
}
