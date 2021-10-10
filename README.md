# Sign Up Page with Validation

By [Dave Ward](mailto:dave.style.code@gmail.com)

[https://github.com/DaveStyleCode/sign-up-page](https://github.com/DaveStyleCode/sign-up-page)

![signup](https://user-images.githubusercontent.com/92013478/136694243-982c6664-0d87-4be5-aeca-7a402c62755c.png)

## Instructions

1. Navigate to [repo](https://github.com/DaveStyleCode/sign-up-page)
2. Clone locally using
   `git clone https://github.com/DaveStyleCode/sign-up-page.git`
3. Install dependencies using `yarn`
4. Run tests using `yarn test`
5. Start your server using `yarn start`
6. Navigate to app in [browser](http://localhost:3000)
7. Enjoy!

[View a deployed version of main](https://ab-signup.vercel.app/)

[View a deployed version of form-submit](https://ab-signup-form-submit.vercel.app/)

## Technologies

I used the following technologies: HTML, CSS, React, and Jest. Scaffolding for this app was generated with [create-react-app](https://goo.gl/26jfy4).

My environment is:

`node 16.11.0`

`yarn 1.22.10`

## Objectives

#### Create a sign up page with the following inputs

1. First Name
2. Last Name
3. Phone Number - should format input to follow the pattern (000) 000-0000 while typing
4. Email Address
5. Password
6. Password Confirmation

#### Additional Considerations/Requirements:

1. The experience should be pleasing to a user, including help/validation
2. Mock a success/error state once the from is submitted

### Notes:

This was a fun exercise to build without relying on a library like [formik](https://formik.org/) or [React Hook Form](https://react-hook-form.com/). They're both so popular because they remove the complexity of creating components, validation rules, error handling and submission to use with forms.

In their absence, I created a custom hook ([useFormValidation](/src/hooks/useFormValidation.js)) to handle validation for the form. This reusable hook accepts a validation config containing a mapping of fields to their own [validation rules](/src/utils/validation.js).

I created two branches that use different approaches to validation:

#### Validation when each input is focused or blurred [main](https://github.com/DaveStyleCode/sign-up-page)

[View a deployed version of main](https://ab-signup.vercel.app/)

This approach show errors when each input is focused or unfocused (blur). The validation feedback is presented more frequently to the user.

#### Validation when the form is submitted [form-submit](https://github.com/DaveStyleCode/sign-up-page/tree/form-submit)

[View a deployed version of form-submit](https://ab-signup-form-submit.vercel.app/)

This approach waits to show errors until the form is submitted. There is research suggesting that reducing interuptions to a user's focus while they are in "Completion Mode" delivers a more positive experience:

> Online form validation can be performed in several ways. This article discusses two empirical studies with 77 and 90 participants, which have found evidence that the best way of presenting error messages is to provide the erroneous fields after users have completed the whole form. Immediate error feedback recommended by the International Organization for Standardization (ISO) showed the worst performance in these studies. Where presented with immediate feedback, users often simply ignored the messages on the screen and continued completing the form as if nothing happened. These results lead to the postulation of the "Modal Theory of Form Completion": Users are in either "Completion" or "Revision Mode" when filling out online forms. These modes affect the users’ way of interaction with the system: During Completion Mode the users’ disposition to correct mistakes is reduced, therefore error messages are often ignored.

Quoted from [this paper](https://www.sciencedirect.com/science/article/abs/pii/S0953543807000100).

### Further enhancements:

I would typically use [Tailwind](https://tailwindcss.com/) or [styled-jsx](https://github.com/vercel/styled-jsx) for a project like this, then set up a theme providing defaults to be composed across all of the components. Given the time constraints, I opted to use the CSS Modules package that comes bundled in Create React App. I did a very quick styling pass that could be improved.
