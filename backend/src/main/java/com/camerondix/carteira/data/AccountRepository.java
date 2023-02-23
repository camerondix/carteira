package com.camerondix.carteira.data;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.camerondix.carteira.model.entity.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {

    Optional<Account> findByExternalId(String id);

    Account getReferenceByExternalId(String externalId);
}
