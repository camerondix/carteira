package com.camerondix.carteira.data;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.camerondix.carteira.model.entity.Account;
import com.camerondix.carteira.model.entity.AccountSubtype;
import com.camerondix.carteira.model.entity.AccountType;

@DataJpaTest
public class AccountRepositoryTest {

    @Autowired
    private AccountRepository underTest;

    // given
    String externalId = "externalId";

    Account expected = Account.builder()
            .externalId(externalId)
            .officialName("officialName")
            .name("name")
            .type(AccountType.ENUM_UNKNOWN)
            .subtype(AccountSubtype.ENUM_UNKNOWN).build();;

    @BeforeEach
    void setUp() {

        expected = underTest.save(expected);
    }

    @Test
    void testFindByExternalId() {

        // when
        var actual = underTest.findByExternalId(externalId).get();

        // then
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void testGetReferenceByExternalId() {

        // when
        var actual = underTest.getReferenceByExternalId(externalId);

        // then
        assertThat(actual.getId()).isEqualTo(expected.getId());
    }
}
