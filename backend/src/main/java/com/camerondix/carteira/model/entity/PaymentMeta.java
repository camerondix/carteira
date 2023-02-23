package com.camerondix.carteira.model.entity;

import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Getter
@Setter
@ToString
public class PaymentMeta {

    private String referenceNumber;

    private String ppdId;

    private String payee;

    private String byOrderOf;

    private String payer;

    private String method;

    private String processor;

    private String reason;
}
