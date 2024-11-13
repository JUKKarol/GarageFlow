using GarageFlow.Configuration.Options;
using System.Xml.Linq;

namespace GarageFlow.Configuration;

public class AppSettings
{
    public ConnectionStringsOptions ConnectionStrings { get; set; }
    public EmailCredsOptions EmailCreds { get; set; }
    public string[] AllowedOrigins { get; set; }
}