using GarageFlow.Configuration.Options;

namespace GarageFlow.Configuration;

public class AppSettings
{
    public ConnectionStringsOptions ConnectionStrings { get; set; }
    public SieveOptions Sieve { get; set; }
    public EmailCredsOptions EmailCreds { get; set; }
    public string[] AllowedOrigins { get; set; }
}