describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('Products List')
  });

  it('Gets Products List from API', () => {
    cy.request('https://dummyjson.com/products')
      .then((response) => {
        // Ensure the response status is 200
        expect(response).property('status').to.equal(200);

        // Validate the response body structure
        const products = response.body.products;
        expect(products).to.be.an('array');
        expect(products.length).to.be.greaterThan(0); // Ensure there is at least one product

        // Validate properties of the first product
        const firstProduct = products[0];
        expect(firstProduct).to.have.all.keys(
          'id', 
          'title', 
          'description', 
          'category', 
          'price', 
          'discountPercentage', 
          'rating', 
          'stock', 
          'tags', 
          'brand', 
          'sku', 
          'weight', 
          'dimensions', 
          'warrantyInformation', 
          'shippingInformation', 
          'availabilityStatus', 
          'reviews', 
          'returnPolicy', 
          'minimumOrderQuantity', 
          'meta', 
          'images', 
          'thumbnail'
        );

        // Validate some specific values for the first product
        expect(firstProduct.title).to.be.a('string').and.not.be.empty;
        expect(firstProduct.price).to.be.a('number').and.to.be.greaterThan(0);
        expect(firstProduct.category).to.be.a('string').and.not.be.empty;
      });
  });

  it('Validates product reviews', () => {
    cy.request('https://dummyjson.com/products')
      .then((response) => {
        const products = response.body.products;

        products.forEach((product:any) => {
          expect(product).to.have.property('reviews').that.is.an('array');

          product.reviews.forEach((review:any) => {
            expect(review).to.include.keys('rating', 'comment', 'date', 'reviewerName', 'reviewerEmail');
            expect(review.rating).to.be.within(1, 5); // Ensure rating is between 1 and 5
            expect(review.comment).to.be.a('string').and.not.be.empty;
            expect(review.reviewerName).to.be.a('string').and.not.be.empty;
            expect(review.reviewerEmail).to.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/); // Validate email format
          });
        });
      });
  });
});

