var config = require('../config'),
    twilio = require('../index');

describe('Twilio Messages resource', function() {
    var client = new twilio.RestClient('AC123', '123');

    it('can retrieve messages', function() {
        spyOn(client, 'request');
        client.messages.list();
        expect(client.request).toHaveBeenCalled();
        expect(client.request).toHaveBeenCalledWith({
            'url': '/Accounts/AC123/Messages',
            'method': 'GET',
            'qs': { }
        }, undefined);
    });

    it('can filter messages', function() {
        spyOn(client, 'request');
        client.messages.get({foo: 'bar'});
        expect(client.request).toHaveBeenCalled();
        expect(client.request).toHaveBeenCalledWith({
            'url': '/Accounts/AC123/Messages',
            'method': 'GET',
            'qs': { 'Foo': 'bar' }
        }, undefined);
    });

    it('can retrieve the list of media for a message', function() {
        spyOn(client, 'request');
        client.messages('MM123').media.get({foo: 'bar'});
        expect(client.request).toHaveBeenCalled();
        expect(client.request).toHaveBeenCalledWith({
            'url': '/Accounts/AC123/Messages/MM123/Media',
            'method': 'GET',
            'qs': { 'Foo': 'bar' }
        }, undefined);
    });

    it('can retrieve media for a specific message', function() {
        spyOn(client, 'request');
        client.messages('MM123').media('ME123').get();
        expect(client.request).toHaveBeenCalled();
        expect(client.request).toHaveBeenCalledWith({
            'url': '/Accounts/AC123/Messages/MM123/Media/ME123',
            'method': 'GET',
            'qs': {}
        }, undefined);
    });

    it('can delete media for a specific message', function() {
        spyOn(client, 'request');
        client.messages('MM123').media('ME123').delete();
        expect(client.request).toHaveBeenCalled();
        expect(client.request).toHaveBeenCalledWith({
            'url': '/Accounts/AC123/Messages/MM123/Media/ME123',
            'method': 'DELETE',
            'form': {}
        }, undefined);
    });

    it('can handle multiple MediaURLs', function() {
        spyOn(client, 'request');
        client.messages.create({
            to: '+1925',
            from: '+1510',
            mediaUrls: ['http://foo', 'http://bar']
        });
        expect(client.request).toHaveBeenCalled();
        expect(client.request).toHaveBeenCalledWith({
            'url': '/Accounts/AC123/Messages',
            'method': 'POST',
            'form': {
                'MediaUrls': ['http://foo', 'http://bar'],
                'To': '+1925',
                'From': '+1510'
            }
        }, undefined);
    });

    it('can use the correct alias', function() {
        spyOn(client, 'request');
        client.sendMessage({
            to: '+1925',
            from: '+1510',
            mediaUrls: ['http://foo', 'http://bar']
        });
        expect(client.request).toHaveBeenCalled();
        expect(client.request).toHaveBeenCalledWith({
            'url': '/Accounts/AC123/Messages',
            'method': 'POST',
            'form': {
                'MediaUrls': ['http://foo', 'http://bar'],
                'To': '+1925',
                'From': '+1510'
            }
        }, undefined);
    });
});


