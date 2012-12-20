using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using BalmainWebsite;
using BalmainWebsite.Model;
using System.Configuration;


public partial class xmas2012_xmas2012 : System.Web.UI.Page
{
    public string currentPerson;

    protected void Page_Load(object sender, EventArgs e)
    {
        using (BalmainWebsiteDataContext dbContext = new BalmainWebsiteDataContext())
        {
            currentPerson = "mholm";
            if (Request.QueryString["p"] != null)
                currentPerson = !String.IsNullOrEmpty(Request.QueryString["p"].ToString()) ? Request.QueryString["p"].ToString() : "mholm";

            var staff = dbContext.staffs.OrderBy(s => s.Last_Name);

            staffList.DataSource = staff;
            staffList.DataBind();
        }
    }


    protected void staffList_DataBound(object sender, EventArgs e)
    {

        staffList.SelectedValue = currentPerson;

    }
}
