/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { css, isFeatureEnabled, FeatureFlag } from '@superset-ui/core';
import { useSqlLabInitialState } from 'src/hooks/apiResources/sqlLab'; // change if needed
import type { InitialState } from 'src/hooks/apiResources/sqlLab'; // change if needed
import { resetState } from 'src/AILab/actions/sqlLab'; // from SqlLab to AILab
import { addDangerToast } from 'src/components/MessageToasts/actions';
import type { SqlLabRootState } from 'src/AILab/types'; // changed from SqlLab to AILab
import { SqlLabGlobalStyles } from 'src/AILab/SqlLabGlobalStyles'; // changed from SqlLab to AILab
import App from 'src/AILab/components/App'; // changed from SqlLab to AILab
import Loading from 'src/components/Loading';
import EditorAutoSync from 'src/AILab/components/EditorAutoSync'; // changed from SqlLab to AILab
import useEffectEvent from 'src/hooks/useEffectEvent';
import { LocationProvider } from './LocationContext';

export default function SqlLab() {
  const lastInitializedAt = useSelector<SqlLabRootState, number>(
    state => state.sqlLab.queriesLastUpdate || 0,
  );
  const { data, isLoading, isError, error, fulfilledTimeStamp } =
    useSqlLabInitialState();
  const shouldInitialize = lastInitializedAt <= (fulfilledTimeStamp || 0);
  const dispatch = useDispatch();

  const initBootstrapData = useEffectEvent(
    (sqlLabInitialState: InitialState) => {
      if (shouldInitialize) {
        dispatch(resetState(sqlLabInitialState));
      }
    },
  );

  useEffect(() => {
    if (data) {
      initBootstrapData(data);
    }
  }, [data, initBootstrapData]);

  if (isLoading || shouldInitialize) return <Loading />;

  if (isError && error?.message) {
    dispatch(addDangerToast(error?.message));
    return null;
  }

  return (
    <LocationProvider>
      <div
        css={css`
          flex: 1 1 auto;
          position: relative;
          display: flex;
          flex-direction: column;
        `}
      >
        <SqlLabGlobalStyles />
        <App />
        {isFeatureEnabled(FeatureFlag.SqllabBackendPersistence) && (
          <EditorAutoSync />
        )}
      </div>
    </LocationProvider>
  );
}
