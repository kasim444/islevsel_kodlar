# React Tricks

## how to define conditional prop
  ```
  // Example: 1
    <Input
      name="password"
      type="password"
      required={true}
      {...(errors.password && { error: true })}
    />
  // Example: 2
  <Link key={label} href={route} passHref>
    <NavbarLink
      {...(isOrangeColor && { color: 'orange' })}
      {...(isBoldFontWeight && { fontWeight: 'bold' })}
    >
      {label}
    </NavbarLink>
  </Link>
  ```
