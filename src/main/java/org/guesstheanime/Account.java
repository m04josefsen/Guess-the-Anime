package org.guesstheanime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Account {

    @Id
    @Column(unique = true, nullable = false)
    private String email;
    private Long accountId;
    private String firstname;
    private String lastname;
    private String password;
}
