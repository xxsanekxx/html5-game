Vec2 = Box2D.Common.Math.b2Vec2;
BodyDef = Box2D.Dynamics.b2BodyDef;
Body = Box2D.Dynamics.b2Body;
FixtureDef = Box2D.Dynamics.b2FixtureDef;
Fixture = Box2D.Dynamics.b2Fixture;
World = Box2D.Dynamics.b2World;
MassData = Box2D.Collision.Shapes.b2MassData;
WorldManifold = Box2D.Collision.b2WorldManifold;
PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
CircleShape = Box2D.Collision.Shapes.b2CircleShape;
DebugDraw = Box2D.Dynamics.b2DebugDraw;
RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;

PhysicsEngineClass = Class.extend({
    world: null,

    PHYSICS_LOOP_HZ : 1.0 / 60.0,

    //-----------------------------------------
    create: function () {
        gPhysicsEngine.world = new World(
            new Vec2(0, 10), // Gravity vector
            false           // Don't allow sleep
        );
    },

    //-----------------------------------------
    update: function (boolDebug) {
        var start = Date.now();

        gPhysicsEngine.world.Step(
            gPhysicsEngine.PHYSICS_LOOP_HZ,    //frame-rate
            10,                 //velocity iterations
            10                  //position iterations
        );
        if (boolDebug) gPhysicsEngine.world.DrawDebugData();
        gPhysicsEngine.world.ClearForces();

        return(Date.now() - start);
    },

    //-----------------------------------------
    addContactListener: function (callbacks) {
        var listener = new Box2D.Dynamics.b2ContactListener();

        if (callbacks.BeginContact) listener.BeginContact = function (contact) {
            callbacks.BeginContact(contact.GetFixtureA(),
                                contact.GetFixtureB());
        };

        if(callbacks.PostSolve) listener.PostSolve = function (contact, impulse) {
            callbacks.PostSolve(contact.GetFixtureA().GetBody(),
                                contact.GetFixtureB().GetBody(),
                                impulse.normalImpulses[0]);
        };
        if(callbacks.EndContact) listener.EndContact = function (contact) {
            callbacks.EndContact(contact.GetFixtureA(),
                                contact.GetFixtureB());
        };

        gPhysicsEngine.world.SetContactListener(listener);
    },

    //-----------------------------------------
    registerBody: function (bodyDef) {
        var body = gPhysicsEngine.world.CreateBody(bodyDef);
        return body;
    },

    //-----------------------------------------
    addBody: function (entityDef) {
        var bodyDef = new BodyDef();

        var id = entityDef.id;

        if(entityDef.type == 'static') {
            bodyDef.type = Body.b2_staticBody;
        } else {
            bodyDef.type = Body.b2_dynamicBody;

        }

        bodyDef.position.x = entityDef.x;
        bodyDef.position.y = entityDef.y;
        //console.log(bodyDef);
        if (entityDef.fixedRotation ) bodyDef.fixedRotation = true;
        if(entityDef.userData)  bodyDef.userData = entityDef.userData;

        var body = this.registerBody(bodyDef);
        var fixtureDefinition = new FixtureDef();

        if(entityDef.useBouncyFixture) {
            fixtureDefinition.density = 0.1;
            fixtureDefinition.friction = 1;
            fixtureDefinition.restitution = 0.5;
        }

        // Now we define the shape of this object as a box
        fixtureDefinition.shape = new PolygonShape();
        fixtureDefinition.shape.SetAsBox(entityDef.halfWidth, entityDef.halfHeight);
        body.CreateFixture(fixtureDefinition);

        return body;
    },
    addSensorFixture: function(body) {
        var fixtureDefinition = new FixtureDef();
        fixtureDefinition.shape = new PolygonShape();
        fixtureDefinition.shape.SetAsOrientedBox(0.2, 0.2, new Vec2(0, 0.70), 0);
        fixtureDefinition.isSensor = true;
        fixtureDefinition.userData = {footSensor: true};
        body.CreateFixture(fixtureDefinition);
        return body;
    },

    //-----------------------------------------
    removeBody: function (obj) {
        gPhysicsEngine.world.DestroyBody(obj);
    }

});

var gPhysicsEngine = new PhysicsEngineClass();

