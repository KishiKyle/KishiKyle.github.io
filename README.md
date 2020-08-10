# CalculatingPI

This is an application which demostrates how PI can be calculated using the Galperin Billiard Model.
For more info and if you are interested in the theory check out: https://arxiv.org/pdf/1712.06698.pdf

The main challenge of this project is building the simulation in a web browser.

In the beginning I was not sure of the limitations of javascript with regard to handling a simulations especially one which would be cpu intensive.
I quickly came accross the the first issue which is that the javascripts SetInterval function can only be called at a maximum speed of 1 millisecond (this is far to slow for this application)
The solution in a nutshell is between each call of the SetInterval many calculations of collisions are taking place.

The physics taking place here is not complex, it is simply the application of the conservation of total momentum (m1u1 + m2u2 = m1v1 + m2v2) when two objects collide,
and a collision detection engine which determines a collision if there is no gap between 2 objects.

I am currently hosting this application on my github home page so please check it out. I think its a beautiful demostration of the mystery of PI.

 
