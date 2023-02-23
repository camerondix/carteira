package com.camerondix.carteira.data;

import java.util.List;

import com.camerondix.carteira.model.entity.Account;

public interface IAccountGraphRepository {

    List<Account> getAccounts(List<String> nodes);

}
