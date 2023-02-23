package com.camerondix.carteira.data;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.camerondix.carteira.model.entity.PlaidItem;

@Repository
public interface PlaidItemRepository extends JpaRepository<PlaidItem, Integer> {

    Optional<PlaidItem> findByPlaidId(String plaidId);

    Optional<PlaidItem> findByAccessToken(String accessToken);
}
