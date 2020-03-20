using api.DataAccess;
using api.Interfaces;
using api.Models;
using api.ModelViews;
using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace api.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(DropdownlistService));

        public AuthenticationService()
        {

        }

        public AuthenticationData login(string username, string password)
        {
            using (var ctx = new ConXContext())
            {
                //su_user user = ctx.user
                //    .Include("departments")
                //    .Include("user_mac")
                //    .Where(z => z.USER_ID == username.ToUpper())
                //    .SingleOrDefault();

                var vuser = username.ToUpper();

                string sql = "select a.user_id username , a.user_name name , a.user_password, a.dept_code , a.active statusId , b.dept_namet dept_name  from su_user a , department b where a.dept_code=b.dept_code and a.user_id = :p_user_id";

                AuthenticationData user = ctx.Database.SqlQuery<AuthenticationData>(sql, new OracleParameter("p_user_id", vuser)).FirstOrDefault();
                
                //su_user user = ctx.user.SqlQuery("Select a.USER_ID , a.USER_NAME , a.USER_PASSWORD , a.DEPT_CODE , a.ACTIVE , b.DEPT_NAMET , c.MC_CODE , c.STATUS from su_user a , department b , pd_mapp_user_mac c  where a.dept_code=b.dept_code and a.user_id=c.user_id and a.user_id = :param1", new OracleParameter("param1", username)).SingleOrDefault();

                //department dept = ctx.departments.SqlQuery("select DEPT_CODE , DEPT_NAMET from department where dept_code = :param1", new OracleParameter("param1", user.DEPT_CODE)).SingleOrDefault();

                //pd_mapp_user_mac user_mac = ctx.user_mac.SqlQuery("select USER_ID , MC_CODE , STATUS from pd_mapp_user_mac where user_id = :param1", new OracleParameter("param1", user.USER_ID)).SingleOrDefault();


                

                if (user == null)
                {
                    throw new Exception("รหัสผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
                }
                //else if (auth == null)
                //{
                //    throw new Exception("ยังไมได้กำนหด หน่วยงาน");
                //}
                else
                {
                    if (!user.user_password.Equals(password))
                    {
                        throw new Exception("รหัสผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
                    }

                    if (!user.statusId.Equals("Y"))
                    {
                        throw new Exception("สถานะผู้ใช้งานนี้ถูกยกเลิก");
                    }

                }
               

                AuthenticationData data = new AuthenticationData()
                {
                    username = user.username,
                    name = user.name,
                    dept_code = user.dept_code,
                    dept_name = user.dept_name,
                    statusId = user.statusId,
                    menuGroups = new List<ModelViews.menuFunctionGroupView>(),
                };



               
                    data.menuGroups = getUserRole((string)user.username);
                


                return data;
            }

        }

        public List<menuFunctionGroupView> getUserRole(string userId)
        {
            using (var ctx = new ConXContext())
            {
                //List<su_user_role> user_role = ctx.user_role.SqlQuery("Select USER_ID , ROLE_ID ,ACTIVE  from su_user_role where user_id = :param1", new OracleParameter("param1", userId)).ToList();

                string sql = "select  level , menu_id, menu_name , menu_type, main_menu , icon_name , menu_url link_name from su_menu where EXISTS   (select MENU_ID  from su_role_menu  WHERE MENU_ID= SU_MENU.MENU_ID AND EXISTS (select role_id from su_user_role  WHERE ROLE_ID= SU_ROLE_MENU.ROLE_ID  and user_id = :param1)) CONNECT BY PRIOR MENU_ID = MAIN_MENU START WITH  menu_id ='MOA0000000' ORDER BY MENU_ID";

                List<menuView> menu = ctx.Database.SqlQuery<menuView>(sql, new OracleParameter("param1", userId)).ToList();

                //List <menuFunctionView> menu = ctx.Database.SqlQuery("select  LEVEL , MENU_ID, MENU_NAME , MENU_TYPE, LINK_NAME , MAIN_MENU , ICON_NAME from su_menu where EXISTS   (select MENU_ID  from su_role_menu  WHERE MENU_ID= SU_MENU.MENU_ID AND EXISTS (select role_id from su_user_role  WHERE ROLE_ID= SU_ROLE_MENU.ROLE_ID  and user_id = :param1)) CONNECT BY PRIOR MENU_ID = MAIN_MENU START WITH  menu_id ='MOB0000000' ORDER BY MENU_ID", new OracleParameter("param1", userId)).ToList();



                List<menuFunctionView> functionViews = new List<menuFunctionView>();


                foreach (var x in menu)
                {
                    if(x.link_name == null)
                    {
                        x.link_name = "#";
                    }

                    menuFunctionView view = new menuFunctionView()
                    {
                        menuFunctionGroupId = x.main_menu,
                        menuFunctionId = x.menu_id,
                        menuFunctionName = x.menu_name,
                        iconName = x.icon_name,
                        menuURL = x.link_name,
                    };


                    functionViews.Add(view);    
                  
                }



                List<menuFunctionGroupView> groupView = new List<menuFunctionGroupView>();

                foreach (var x in menu)
                {
                    menuFunctionGroupView view = new menuFunctionGroupView()
                    {
                        menuFunctionGroupId = x.menu_id,
                        menuFunctionGroupName = x.menu_name,
                        iconName = x.icon_name,
                        menuFunctionList = functionViews
                                .Where(o => o.menuFunctionGroupId == x.menu_id)
                                .ToList()

                    };

                    if (x.menu_type == "M" && x.menu_id != "MOA0000000")
                    {
                        groupView.Add(view);
                    }
                }

                return groupView;


            }
        }


    }
}