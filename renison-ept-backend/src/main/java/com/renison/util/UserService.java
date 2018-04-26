package com.renison.util;

import com.renison.model.AdminAuthentication;
import com.renison.repository.AuthenticationRepository;
import com.renison.repository.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    AuthenticationRepository authenticationRepository;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserService() {
    }

    public void save(AdminAuthentication admin) {
        admin.setPassword(bCryptPasswordEncoder.encode(admin.getPassword()));
        authenticationRepository.save(admin);
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        AdminAuthentication auth = authenticationRepository.findByUsername(s);
        if (auth == null) {
            throw new UsernameNotFoundException(s);
        }
        List<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList("ADMIN");
        return new CustomUserDetails(auth.getUsername(), auth.getPassword(), authorities);
    }

}
