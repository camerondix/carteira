package com.camerondix.carteira.data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.camerondix.carteira.model.entity.Account;
import com.camerondix.carteira.model.entity.Transaction;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Integer> {

    Optional<Transaction> findByExternalId(String id);

    Transaction getReferenceByExternalId(String id);

    @Query("select t from Transaction t where t.timestamp <= :afterTime and t.id < :afterId order by timestamp desc, id desc")
    Slice<Transaction> findAllCursorBasedPagination(Pageable pageable, Integer afterId, LocalDateTime afterTime);

    List<Transaction> findAllByAccount(Account account, Pageable pageable);
}
