package com.camerondix.carteira.configuration;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.plaid.client.ApiClient;
import com.plaid.client.request.PlaidApi;

@Configuration
public class PlaidConfiguration {

    @Bean
    @Autowired
    public PlaidApi plaidApi(PlaidConfugrationProperties properties) {

        var apiKeys = new HashMap<String, String>();
        apiKeys.put("clientId", properties.getClientId());
        apiKeys.put("secret", properties.getSecret());
        var apiClient = new ApiClient(apiKeys);
        apiClient.setPlaidAdapter(properties.getUrl());
        return apiClient.createService(PlaidApi.class);
    }
}
