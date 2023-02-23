package com.camerondix.carteira.model.entity;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.ToString;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Getter
@ToString
public class Apr {

    private float percentage;

    @Enumerated(EnumType.STRING)
    @NonNull
    private AprType type;

    private Float balanceSubjectToApr;

    private Float interestChargeAmount;
}
