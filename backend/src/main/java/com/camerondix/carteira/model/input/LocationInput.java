package com.camerondix.carteira.model.input;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;

@Data
@AllArgsConstructor
public class LocationInput {

    @NonNull
    private Integer transactionId;

    private String merchantName;

    private String address;

    private String city;

    private String region;

    private String postalCode;

    private Float latitude;

    private Float longitude;
}
