package com.renison.repository;

import com.renison.model.AdminAuthentication;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthenticationRepository extends JpaRepository<AdminAuthentication, Long> {
    AdminAuthentication findByUsername(String username);
    AdminAuthentication findByUsernameAndPassword(String username, String password);
}
