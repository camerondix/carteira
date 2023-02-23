package com.camerondix.carteira.controller;

import java.util.List;

import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

import com.camerondix.carteira.model.entity.Apr;
import com.camerondix.carteira.model.entity.CreditInfo;

@Controller
public class CreditInfoController {

    @SchemaMapping
    public List<Apr> aprs(CreditInfo creditInfo) {

        return creditInfo.getAprs();
    }
}
