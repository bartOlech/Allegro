const request = require('request');

module.exports.get = (req, res) => {
  const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDcyMzU2NDAsInVzZXJfbmFtZSI6IjkwNjQwMTAxIiwianRpIjoiY2FjMDI4MmYtYzUyZi00NjI0LWI2ZjQtYzQ5YzAxZTAyNDU5IiwiY2xpZW50X2lkIjoiMTBlOWM5NzZkNTc1NDA2M2ExMDNlNmM4OTM4ZWRkOWEiLCJzY29wZSI6WyJhbGxlZ3JvOmFwaTpvcmRlcnM6cmVhZCIsImFsbGVncm86YXBpOnByb2ZpbGU6d3JpdGUiLCJhbGxlZ3JvOmFwaTpzYWxlOm9mZmVyczp3cml0ZSIsImFsbGVncm86YXBpOmJpbGxpbmc6cmVhZCIsImFsbGVncm86YXBpOmNhbXBhaWducyIsImFsbGVncm86YXBpOmRpc3B1dGVzIiwiYWxsZWdybzphcGk6YmlkcyIsImFsbGVncm86YXBpOnNhbGU6b2ZmZXJzOnJlYWQiLCJhbGxlZ3JvOmFwaTpvcmRlcnM6d3JpdGUiLCJhbGxlZ3JvOmFwaTphZHMiLCJhbGxlZ3JvOmFwaTpwYXltZW50czp3cml0ZSIsImFsbGVncm86YXBpOnNhbGU6c2V0dGluZ3M6d3JpdGUiLCJhbGxlZ3JvOmFwaTpwcm9maWxlOnJlYWQiLCJhbGxlZ3JvOmFwaTpyYXRpbmdzIiwiYWxsZWdybzphcGk6c2FsZTpzZXR0aW5nczpyZWFkIiwiYWxsZWdybzphcGk6cGF5bWVudHM6cmVhZCJdLCJhbGxlZ3JvX2FwaSI6dHJ1ZX0.P2yBp_d3UolgEXjN5oqdW4PllPju49bsnmxkfmePk8FwWo50680n1hXTPIrSIZ3xN-sm0dIADonbWF_o22APlrTbaOeDrv1P4ijGd5tH-mQeKFmK-0rMVU8BxTm0hMo8kJf8hoPqbdjJkdPAeP6Bl5cnRf6x7qCPFrA5MJhGbLSgiz8dHAnYe_JKOj3fB9Uvqq8hvZCr5z43R5Eiu0as4Lz-dXeqaTGHbRL7l6tHrAdvJZM38jNisUIaq5eMGAfwX-XpZu4b8DP3U8sV4cqlYbO616ijgUcqmleAC6WXTl6ZRAhObndZeHSEQv1t9945qJ087xDiz6Tuis9gE4P7Rw';
  const refreshToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiI5MDY0MDEwMSIsInNjb3BlIjpbImFsbGVncm86YXBpOm9yZGVyczpyZWFkIiwiYWxsZWdybzphcGk6cHJvZmlsZTp3cml0ZSIsImFsbGVncm86YXBpOnNhbGU6b2ZmZXJzOndyaXRlIiwiYWxsZWdybzphcGk6YmlsbGluZzpyZWFkIiwiYWxsZWdybzphcGk6Y2FtcGFpZ25zIiwiYWxsZWdybzphcGk6ZGlzcHV0ZXMiLCJhbGxlZ3JvOmFwaTpiaWRzIiwiYWxsZWdybzphcGk6c2FsZTpvZmZlcnM6cmVhZCIsImFsbGVncm86YXBpOm9yZGVyczp3cml0ZSIsImFsbGVncm86YXBpOmFkcyIsImFsbGVncm86YXBpOnBheW1lbnRzOndyaXRlIiwiYWxsZWdybzphcGk6c2FsZTpzZXR0aW5nczp3cml0ZSIsImFsbGVncm86YXBpOnByb2ZpbGU6cmVhZCIsImFsbGVncm86YXBpOnJhdGluZ3MiLCJhbGxlZ3JvOmFwaTpzYWxlOnNldHRpbmdzOnJlYWQiLCJhbGxlZ3JvOmFwaTpwYXltZW50czpyZWFkIl0sImFsbGVncm9fYXBpIjp0cnVlLCJhdGkiOiJjYWMwMjgyZi1jNTJmLTQ2MjQtYjZmNC1jNDljMDFlMDI0NTkiLCJleHAiOjE2MTQ5Njg0NDAsImp0aSI6ImVlZWU3NDQ3LTk4MzItNDk3ZC05MTFkLTZlYWFlNTk4ZDcwMiIsImNsaWVudF9pZCI6IjEwZTljOTc2ZDU3NTQwNjNhMTAzZTZjODkzOGVkZDlhIn0.Y_DbFC2O0gbPeIDLXfIziv_dagBjBgKrDwOMU9fHLI8QlK0kz7d3n1So_6Jeq43IbY2jFgDt_HekTsSTooJTYlzub50t8mU86c-n9RUwyKBdxGr52mTsRIZb3lAdVzVmKxWIn73lvD8jLitRK-_f59o2EcN9CnSDAVS6Lhak-c0MHKWGsqPoPQYaWGXoKLzxoB2tv7wMgxX2equF1ikDnR3P8DkauQxLuXbNnE0N_UWnTCW-1E8cg9Z1RzWdiprs1QIlvnp3vQusrgo8UEfdDdjwxuukIfGWNZrOQ1jS28fT8jfFNHAWhcklvs4dotFFQb4LNmrhHGdiXuXUAIK1rg';

  const url = `https://api.allegro.pl/billing/billing-entries`;
  const auth = `Bearer ${token}`;

  request(
    {
        url : url,
        headers : {
            "Authorization" : auth,
            "accept": "application/vnd.allegro.public.v1+json"
        }
    },
    function (error, response, body) {
        res.send(body)
    }
  );
}