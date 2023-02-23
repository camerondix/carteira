package com.camerondix.carteira.data;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import java.time.LocalDateTime;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.camerondix.carteira.model.entity.Account;
import com.camerondix.carteira.model.entity.AccountSubtype;
import com.camerondix.carteira.model.entity.AccountType;
import com.camerondix.carteira.model.entity.Category;
import com.camerondix.carteira.model.entity.Transaction;

@DataJpaTest
public class TransactionRepositoryTest {

        @Autowired
        private TransactionRepository underTest;

        @Autowired
        private AccountRepository accountRepository;

        @Autowired
        private CategoryRepository categoryRepository;

        // given
        String externalId = "externalId";

        Account account = Account.builder()
                        .externalId(externalId)
                        .officialName("officialName")
                        .name("name")
                        .type(AccountType.ENUM_UNKNOWN)
                        .subtype(AccountSubtype.ENUM_UNKNOWN)
                        .build();

        Category category = Category.builder().name("name").build();

        Transaction expected = Transaction.builder()
                        .externalId(externalId)
                        .account(account)
                        .name("name")
                        .timestamp(LocalDateTime.now())
                        .category(category)
                        .build();

        @BeforeEach
        void setUp() {

                account = accountRepository.save(account);
                category = categoryRepository.save(category);
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
