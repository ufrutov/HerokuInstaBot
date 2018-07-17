const request = require('request-promise');

module.exports = parsePage;

/**
 * @param  {string} url
 * @return {Promise}
 */
function parsePage(url) {
  return new Promise((resolve, reject) => {
    request.get({
      uri: url,
      transform(body) {
        return body;
      }
    })
      .then(body => {
        const response = JSON.parse(body);
        const fail = function(msg) {
          return reject({
            message: msg,
            success: false,
            url: url,
            data: []
          });
        };

        if( response.hasOwnProperty('graphql') ) {
          if( response['graphql'].hasOwnProperty('shortcode_media') ) {
            const media = response['graphql']['shortcode_media'];

            // Multi photo post processing
            if( media.hasOwnProperty('edge_sidecar_to_children') ) {
              const children = media['edge_sidecar_to_children'];
              if( children.hasOwnProperty('edges') ) {
                const edges = children['edges'];
                if( edges.length > 0 ) {
                  var data = [];
                  edges.forEach(function(element) {
                    if( element.node.hasOwnProperty('display_url') &&
                        element.node['display_url'].length > 0 ) {
                      data.push(element.node['display_url']);
                    }
                  });
                  if( data.length > 0 ) {
                    return resolve({
                      data: data,
                      success: true,
                      url: url
                    });
                  } else {
                    return fail('All "edges" items are empty at multi photos post request response.');
                  }
                } else {
                  return fail('"edges" field is empty at multi photos post request response.');
                }
              } else {
                return fail('No "edges" field in "edge_sidecar_to_children" property of multi photos post request response.');
              }
            } else {
              if( media.hasOwnProperty('display_url') &&
                  media['display_url'].length > 0 ) {

                // Single image post
                return resolve({
                  data: [media['display_url']],
                  success: true,
                  url: url
                });
              } else {
                return fail('No or empty "display_url" field in single post request response.');
              }
            }
          } else {
            return fail('No "shortcode_media" field in post request response.');
          }
        } else {
          return fail('No "graphql" field in post request response.');
        }
      }, err => {
        return reject({
          message: `Failed to request resource`,
          success: false,
          url: url,
          data: []
        });
      });
  });
}
