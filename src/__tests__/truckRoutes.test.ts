import request from 'supertest';
import app from '../app';

// imitate test factory
const createTruck = async () => {
    return request(app)
        .post('/')
        .send({
            make: 'Toyota',
            year: 2023,
            capacity: 5000,
            status: 'Available',
            latitude: 45.123,
            longitude: -75.456,
        });
}

describe('Truck Fleet Service API', () => {
  it('should create a new truck', async () => {
    const response = await createTruck();

    expect(response.status).toBe(201);
    expect(response.body._id).toBeDefined();
  });

  it('should get a specific truck', async () => {
    const createResponse = await createTruck();
    const response = await request(app).get(`/${createResponse.body._id}`);

    expect(response.status).toBe(200);
    expect(response.body._id).toBe(createResponse.body._id);
  });

  it('should return a 404 status for a non-existent truck', async () => {
    const response = await request(app).get('/65403f538ec0bbe919eaf64c');

    expect(response.status).toBe(404);
  });

  it('should get trucks within a certain radius', async () => {
    await createTruck();
    const response = await request(app).get('/nearby?lat=45.123&lon=-75.456&rad=100000');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

    it('should validate createTruck request with invalid data', async () => {
        const response = await request(app)
            .post('/')
            .send({});

        expect(response.status).toBe(400);
    });

    it('should validate getTrucksNearby request with valid data', async () => {
        const response = await request(app)
            .get('/nearby?lat=40.7128&lon=-74.0060');

        expect(response.status).toBe(200);
    });

    it('should validate getTrucksNearby request with invalid data', async () => {
        const response = await request(app)
            .get('/nearby?lat=invalid&lon=invalid');

        expect(response.status).toBe(400);
    });

    it('should validate truckId with invalid ID format', async () => {
        const invalidId = 'invalid-id';

        const response = await request(app)
            .get(`/${invalidId}`);

        expect(response.status).toBe(400);
    });
});

