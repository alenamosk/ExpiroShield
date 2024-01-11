import * as React from "react";
import { SVGProps } from "react";

interface ProductsIconProps {
  fill: string;
  stroke: string;
}

const ProductsIcon = (props: ProductsIconProps) => (
  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <path
      style={{
        fill: props.fill,
        stroke: props.stroke,
      }}
      className="cls-2"
      d="M487.828 289.496c-12.858-17.271-30.156-28.682-50.827-33.724v-17.268h2.571c6.649 0 12.039-5.39 12.039-12.039s-5.39-12.039-12.039-12.039H301.565L321.71 31.051a12.037 12.037 0 0 0-11.966-13.353H12.038A12.04 12.04 0 0 0 .072 31.051l41.32 376.126a12.04 12.04 0 0 0 11.966 10.724h.348l3.923 56.279c.439 6.308 5.686 11.202 12.01 11.202h136.226c12.643 5.887 26.975 8.919 42.673 8.919h162.817c32.159 0 58.603-12.688 76.473-36.689C503.641 436.374 512 407.307 512 373.555c0-33.751-8.359-62.821-24.172-84.059zm-74.904-50.994v14.314c-.522-.006-1.045-.01-1.569-.01H248.539c-.524 0-1.047.004-1.569.01v-14.314h165.954zM64.148 393.821 25.472 41.775H296.31l-18.967 172.651H258.82l12.898-117.397a12.037 12.037 0 0 0-11.966-13.353H62.032a12.04 12.04 0 0 0-11.966 13.353l25.078 228.278a12.038 12.038 0 0 0 11.966 10.724h64.645a155.993 155.993 0 0 0-1.094 5.503c-.199 1.103-.39 2.212-.567 3.329-.124.779-.238 1.564-.353 2.35a163.377 163.377 0 0 0-.42 3.06c-.116.92-.217 1.852-.319 2.782-.102.934-.207 1.867-.295 2.811-.1 1.067-.178 2.146-.259 3.226-.063.843-.135 1.681-.187 2.53-.078 1.269-.13 2.555-.182 3.84-.028.687-.069 1.368-.09 2.06-.06 1.991-.094 3.999-.094 6.03 0 1.919.034 3.823.089 5.72.02.736.057 1.461.087 2.191.046 1.122.094 2.242.159 3.354a186.33 186.33 0 0 0 .392 5.348c.09 1.04.185 2.078.293 3.107.019.182.033.367.052.548H64.148zm156.173-155.319h2.571v17.268c-15.59 3.803-29.256 11.236-40.551 22.066-5.942 5.688-11.202 12.296-15.716 19.767-.083.137-.166.273-.248.412a107.243 107.243 0 0 0-2.238 3.926c-.141.26-.279.522-.418.784a111.2 111.2 0 0 0-1.958 3.837c-.177.364-.344.737-.518 1.103-.445.946-.881 1.905-1.307 2.874-.208.472-.423.938-.625 1.414H97.899l-9.282-84.492h48.723c6.649 0 12.039-5.39 12.039-12.039s-5.39-12.037-12.039-12.037H85.971l-3.968-36.116h79.413c6.649 0 12.039-5.39 12.039-12.039s-5.39-12.039-12.039-12.039H79.358l-3.893-35.439h170.851l-11.718 106.673h-14.277c-6.649 0-12.039 5.39-12.039 12.039s5.39 12.038 12.039 12.038zM80.868 461.303l-2.949-42.301h75.792l.018.061a136.49 136.49 0 0 0 1.772 5.895l.059.191c.61 1.859 1.253 3.692 1.935 5.491.504 1.341 1.049 2.643 1.59 3.946.141.336.271.681.414 1.015a117.598 117.598 0 0 0 2.079 4.572l.055.118c3.722 7.761 8.136 14.8 13.253 21.011H80.868zm330.487 8.919H248.539c-13.196 0-24.128-2.557-33.187-6.86a12.12 12.12 0 0 0-1.262-.754c-14.05-7.141-23.38-18.43-29.575-30.404-10.168-19.97-12.235-42.855-12.507-55.501a173.432 173.432 0 0 1-.035-3.153c0-1.335.026-2.65.055-3.963.331-12.361 2.386-33.632 11.499-52.688.12-.246.237-.491.36-.737.066-.136.135-.272.202-.408a83.897 83.897 0 0 1 1.569-2.945c.429-.764.858-1.526 1.306-2.268l.158-.267c9.796-16.109 24.07-26.917 42.021-31.231.067-.016.138-.029.206-.045a73.38 73.38 0 0 1 2.965-.631 78.448 78.448 0 0 1 2.171-.373c.384-.063.766-.128 1.153-.185.994-.146 2-.281 3.025-.392h.002l.008-.001c.106-.012.211-.026.317-.037a85.994 85.994 0 0 1 2.912-.255l.091-.007.858-.057a88.567 88.567 0 0 1 2.012-.097l.808-.031a96.494 96.494 0 0 1 2.868-.047h162.817c1.051 0 2.086.019 3.108.051 3.041.099 6.019.343 8.887.731.089.012.178.008.266.018 59.431 8.029 64.304 74.573 64.304 95.87.001 22.675-5.521 96.667-76.566 96.667z"
    />

    <path
      style={{
        fill: props.fill,
        stroke: props.stroke,
      }}
      className="cls-2"
      d="M329.948 301.708c-65.442 0-116.706 31.984-116.706 72.816s51.264 72.816 116.706 72.816 116.706-31.984 116.706-72.816c-.001-40.832-51.264-72.816-116.706-72.816zm67.965 105.381c-17.962 10.43-42.099 16.174-67.967 16.174s-50.005-5.744-67.967-16.174c-6.677-3.878-16.629-10.907-21.602-20.527h96.656c6.649 0 12.039-5.39 12.039-12.039s-5.39-12.039-12.039-12.039h-96.656c4.973-9.62 14.925-16.649 21.602-20.526 17.962-10.43 42.099-16.174 67.967-16.174s50.005 5.744 67.967 16.174c9.211 5.349 24.662 16.692 24.662 32.565 0 15.874-15.451 27.217-24.662 32.566zM209.337 152.875a12.193 12.193 0 0 0-1.794-4.334 13.542 13.542 0 0 0-1.493-1.83 13.619 13.619 0 0 0-1.83-1.493c-.662-.433-1.36-.807-2.083-1.108s-1.481-.53-2.251-.686a11.915 11.915 0 0 0-4.707 0c-.771.156-1.529.385-2.251.686-.722.301-1.421.674-2.083 1.108-.65.445-1.276.939-1.83 1.493a12.755 12.755 0 0 0-1.493 1.83c-.433.662-.807 1.36-1.108 2.083-.301.722-.53 1.481-.686 2.251a12.01 12.01 0 0 0-.229 2.36 11.909 11.909 0 0 0 .915 4.599c.301.722.674 1.421 1.108 2.083.433.65.939 1.276 1.493 1.83.554.554 1.18 1.059 1.83 1.493.662.433 1.36.807 2.083 1.108.722.301 1.481.53 2.251.686.782.156 1.565.241 2.348.241.795 0 1.577-.084 2.36-.241.771-.156 1.529-.385 2.251-.686s1.421-.674 2.083-1.108c.65-.433 1.264-.939 1.83-1.493a12.906 12.906 0 0 0 1.493-1.83c.433-.662.807-1.36 1.108-2.083.301-.722.53-1.481.686-2.251.156-.783.229-1.565.229-2.348a12.01 12.01 0 0 0-.23-2.36z"
    />

    <path
      style={{
        fill: props.fill,
        stroke: props.stroke,
      }}
      className="cls-2"
      d="M384.957 372.171a12.17 12.17 0 0 0-1.794-4.334c-.445-.662-.951-1.276-1.505-1.83s-1.168-1.059-1.83-1.493a12.22 12.22 0 0 0-2.071-1.108 12.696 12.696 0 0 0-2.251-.686 11.915 11.915 0 0 0-4.707 0c-.771.156-1.529.385-2.251.686-.734.301-1.433.674-2.083 1.108-.662.433-1.276.939-1.83 1.493s-1.059 1.168-1.493 1.83c-.433.65-.807 1.36-1.108 2.083-.301.722-.53 1.481-.686 2.251-.156.77-.241 1.565-.241 2.348 0 .795.084 1.577.241 2.36.157.771.385 1.517.686 2.251.301.722.674 1.421 1.108 2.071.433.662.939 1.276 1.493 1.83s1.168 1.059 1.83 1.505c.65.433 1.348.807 2.083 1.108.722.301 1.481.53 2.251.686.77.157 1.565.229 2.348.229.795 0 1.577-.072 2.36-.229a12.696 12.696 0 0 0 2.251-.686 12.187 12.187 0 0 0 2.071-1.108 12.276 12.276 0 0 0 3.335-3.335 12.22 12.22 0 0 0 1.108-2.071 12.4 12.4 0 0 0 .686-2.251 12.01 12.01 0 0 0 .229-2.36 11.883 11.883 0 0 0-.23-2.348zM185.26 213.068a12.4 12.4 0 0 0-.686-2.251 12.187 12.187 0 0 0-2.601-3.901 12.841 12.841 0 0 0-1.83-1.505c-.662-.433-1.36-.807-2.083-1.108s-1.481-.53-2.251-.686a11.915 11.915 0 0 0-4.707 0c-.77.156-1.529.385-2.251.686-.722.301-1.433.674-2.083 1.108-.662.445-1.276.939-1.83 1.505a11.56 11.56 0 0 0-1.493 1.83 12.22 12.22 0 0 0-1.108 2.071 12.4 12.4 0 0 0-.686 2.251 12.01 12.01 0 0 0-.229 2.36 11.909 11.909 0 0 0 .915 4.599c.301.722.674 1.421 1.108 2.083.433.65.939 1.276 1.493 1.83s1.168 1.059 1.83 1.493c.65.433 1.36.807 2.083 1.108.722.301 1.481.53 2.251.686.783.156 1.565.241 2.348.241.795 0 1.577-.084 2.36-.241.77-.156 1.529-.385 2.251-.686s1.421-.674 2.083-1.108c.65-.433 1.264-.939 1.83-1.493a12.906 12.906 0 0 0 1.493-1.83c.433-.662.807-1.36 1.108-2.083.301-.722.53-1.481.686-2.251.156-.783.241-1.565.241-2.348a12.024 12.024 0 0 0-.242-2.36z"
    />
  </svg>
);

export default ProductsIcon;