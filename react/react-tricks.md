# React Tricks

## How to define conditional prop

```js
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

## How to submit form outside formik form

```js
/**
 * Grabs all of the formik functions and information from context,
 * then attaches it to a ref.
 */
const FormProxy = React.forwardRef(function (_props, ref) {
  const formik = useFormikContext()
  React.useImperativeHandle(ref, () => ({ ...formik }), [formik])
  return null
})

export const Form = forwardRef((props: FormProps, ref) => (
  <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={SCHEMA}>
    {({ handleChange, handleBlur, values, errors, touched }) => (
      <FormProxy ref={ref} />
      <View style={BOTTOM_CONTAINER_TOP}>
        <TextField
          onChangeText={handleChange("fullName")}
          onBlur={handleBlur("fullName")}
          value={values.fullName}
          error={errors.fullName && touched.fullName}
          errorMessage={errors.fullName}
          labelTx="common.payPersonTo"
        />
      </View>
    )}
  </Formik>
)

export const Screen = observer((props: ScreenProps) => {
  const formRef = useRef(null)
  const navigation = useNavigation()

  const handleNextStep = () => {
    if (formRef.current) formRef.current.submitForm()
  }

  return (
    <MultiStepActionShell
      subHeaderTx="lorem.ipsum"
      footerButtonTx="common.continue"
      handleButtonOnFooterOnClick={handleNextStep}
    >
      <Form ref={formRef} />
    </MultiStepActionShell>
  )
})
```
