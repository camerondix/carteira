package com.camerondix.carteira.model.entity;

import lombok.NonNull;

public enum AccountType {

    //@formatter:off
    INVESTMENT("investment"),
    CREDIT("credit"),
    CASH("depository"),
    LOAN("loan"),
    BROKERAGE("brokerage"),
    OTHER("other"),
    ENUM_UNKNOWN("ENUM_UNKNOWN");
	//@formatter:on

    @NonNull
    private String value;

    AccountType(@NonNull String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return String.valueOf(value);
    }

    public static AccountType fromValue(@NonNull String value) {
        for (AccountType b : AccountType.values()) {
            if (b.value.equals(value)) {
                return b;
            }
        }
        return ENUM_UNKNOWN;
    }
}
