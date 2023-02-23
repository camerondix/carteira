package com.camerondix.carteira.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.camerondix.carteira.model.entity.Balance;

@Repository
public interface BalanceRepository extends JpaRepository<Balance, Integer> {

}
