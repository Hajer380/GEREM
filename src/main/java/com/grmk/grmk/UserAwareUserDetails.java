package com.grmk.grmk;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.grmk.grmk.entities.Utilisateur;

public class UserAwareUserDetails implements UserDetails {

    private final Utilisateur user;
    private final Collection<? extends GrantedAuthority> grantedAuthorities;

    public UserAwareUserDetails(Utilisateur user) {
        this(user, new ArrayList<GrantedAuthority>());
    }

    public UserAwareUserDetails(Utilisateur user, Collection<? extends GrantedAuthority> grantedAuthorities) {
        this.user = user;
        this.grantedAuthorities = grantedAuthorities;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return grantedAuthorities;
    }

    @Override
    public String getPassword() {
        return user.getNomPersonne();
    }

    @Override
    public String getUsername() {
        return user.getMatricule();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public Utilisateur getUser() {
        return user;
    }
}