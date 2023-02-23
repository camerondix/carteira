package com.camerondix.carteira.model.input;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;

@Data
@AllArgsConstructor
public class PaymentMetaInput {

    @NonNull
    private Integer transactionId;

    private String referenceNumber;

    private String ppdId;

    private String payee;

    private String byOrderOf;

    private String payer;

    private String method;

    private String processor;

    private String reason;
}
