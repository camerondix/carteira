package com.camerondix.carteira.model.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "categories")
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Getter
@ToString(exclude = { "transactions" })
public class Category {

    @Id
    @Column(name = "id", updatable = false, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter
    private Integer id;

    @Column(name = "name", nullable = false, unique = true, length = 40)
    @NonNull
    private String name;

    @Column(name = "description", length = 100)
    private String description;

    @Column(name = "icon_id", nullable = false, length = 35)
    private String icon;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinColumn(name = "parent_id", updatable = false)
    private Category parent;

    @OneToMany(cascade = CascadeType.MERGE, mappedBy = "parent")
    @NonNull
    @Builder.Default
    private List<Category> children = List.of();

    @OneToMany(cascade = CascadeType.MERGE, mappedBy = "category")
    @NonNull
    @Builder.Default
    private List<Transaction> transactions = List.of();
}
