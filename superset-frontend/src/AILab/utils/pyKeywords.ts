/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

const PYTHON_KEYWORDS = [
    'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def',
    'del', 'elif', 'else', 'except', 'False', 'finally', 'for', 'from', 'global',
    'if', 'import', 'in', 'is', 'lambda', 'None', 'nonlocal', 'not', 'or', 'pass',
    'raise', 'return', 'True', 'try', 'while', 'with', 'yield'
];

const PYTHON_BUILTIN_TYPES = [
    'int', 'float', 'complex', 'bool', 'str', 'list', 'tuple', 'dict', 'set', 'frozenset',
    'bytes', 'bytearray', 'memoryview', 'range', 'NoneType'
];

const allKeywords = PYTHON_KEYWORDS.concat(PYTHON_BUILTIN_TYPES);

const pythonKeywords = allKeywords.map(keyword => ({
    meta: 'python',
    name: keyword,
    score: 100,
    value: keyword
}));

export default pythonKeywords;
