package com.camerondix.carteira.model.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "plaid_items")
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Getter
@ToString
public class PlaidItem {

    @Id
    @Column(name = "id", updatable = false, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter
    private Integer id;

    @Column(name = "plaid_id", updatable = false, length = 37, unique = true)
    @NonNull
    private String plaidId;

    @Column(name = "access_token", nullable = false, length = 55, unique = true)
    @NonNull
    private String accessToken;

    @Column(name = "transaction_cursor", length = 255)
    @Setter
    private String transactionCursor;

    @Column(name = "institution_id", updatable = false, length = 10)
    private String institutionId;

    @OneToMany(cascade = CascadeType.MERGE)
    @Setter
    @NonNull
    @Builder.Default
    private List<Account> accounts = List.of();
}
