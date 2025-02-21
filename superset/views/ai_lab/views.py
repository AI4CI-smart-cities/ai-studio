# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.
from typing import TYPE_CHECKING

from flask_appbuilder import expose
from flask_appbuilder.security.decorators import has_access

from superset import app
from superset.constants import MODEL_VIEW_RW_METHOD_PERMISSION_MAP
from superset.superset_typing import FlaskResponse
from superset.views.base import BaseSupersetView

if TYPE_CHECKING:
    from werkzeug.datastructures import FileStorage

config = app.config
stats_logger = config["STATS_LOGGER"]

class AIlabView(BaseSupersetView):
    class_permission_name = "SQLLab"
    method_permission_name = MODEL_VIEW_RW_METHOD_PERMISSION_MAP

    @expose("/ailab/")
    @has_access
    def list(self) -> FlaskResponse:
        custom_data = {
            'title': 'AI Lab',
            'some_other_data': 'This is example data for AI Lab'
        }

        # return self.render_template("ailab/ailab.html", **custom_data)  # Pass template name and data
        return super().render_app_template()


