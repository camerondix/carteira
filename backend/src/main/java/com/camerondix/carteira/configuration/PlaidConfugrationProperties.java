package com.camerondix.carteira.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@ConfigurationProperties(prefix = "plaid")
@RequiredArgsConstructor
@Getter
public class PlaidConfugrationProperties {

    private final String url;

    private final String clientId;

    private final String secret;

    private final String[] tokens;
}
