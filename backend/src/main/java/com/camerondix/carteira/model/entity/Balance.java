package com.camerondix.carteira.model.entity;

import java.time.LocalDateTime;
import java.util.Objects;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "balances")
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Getter
@ToString
public class Balance {

    @Id
    @Column(name = "id", updatable = false, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false, cascade = CascadeType.MERGE)
    @JoinColumn(name = "account_id", nullable = false, updatable = false)
    @NonNull
    private Account account;

    @Column(name = "timestamp", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @Setter
    @NonNull
    private LocalDateTime timestamp;

    @Column(name = "current", updatable = false)
    private Float current;

    @Column(name = "available", updatable = false)
    private Float available;

    @Column(name = "limit", updatable = false)
    private Float limit;

    public boolean valuesAreEqual(@NonNull Balance balance) {

        return Objects.equals(this.getAvailable(), balance.getAvailable())
                && Objects.equals(this.getCurrent(), balance.getCurrent())
                && Objects.equals(this.getLimit(), balance.getLimit());
    }
}
