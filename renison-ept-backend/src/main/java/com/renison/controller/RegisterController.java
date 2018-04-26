package com.renison.controller;

import com.renison.model.AdminAuthentication;
import com.renison.repository.AuthenticationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
public class RegisterController {

    private static final Logger logger = LoggerFactory.getLogger(RegisterController.class);

    @Resource
    private
    AuthenticationRepository authenticationRepository;

    @Resource
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @RequestMapping("/register")
    public void register() {
        if (authenticationRepository.count() == 0) {
            authenticationRepository.save(new AdminAuthentication("ron",
                    bCryptPasswordEncoder.encode("thechampion")));
        }
    }
}
