import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

it("renders without crashing", () => {
  render(<Carousel photos={TEST_IMAGES} title="images for testing" />);
});

it("matches snapshot", () => {
  const { asFragment } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  expect(asFragment()).toMatchSnapshot();
});

it("moves backward when you click on the left arrow", () => {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );

  // Move forward to second image
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // Sanity check: second image should show
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();

  // Click left arrow
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  // Now we expect to be back on first image
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
});

it("hides the left arrow on the first image", () => {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="testing arrows" />
  );

  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  expect(leftArrow).not.toBeVisible();
});

it("hides the right arrow on the last image", () => {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="testing arrows" />
  );

  const rightArrow = container.querySelector(".bi-arrow-right-circle");

  // Move to last image
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow); // Now on 3rd image (index 2)

  expect(
    container.querySelector(".bi-arrow-right-circle")
  ).not.toBeVisible(); 
});
