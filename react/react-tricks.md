# React Tricks

## how to define conditional prop
  ```
    <Input
      name="password"
      type="password"
      required={true}
      {...(errors.password && { error: true })}
    />
  ```
